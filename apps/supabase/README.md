
## setting

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY= 
NEXT_SUPABASE_SERVICE_ROLE=
NEXT_SUPABASE_DB_PASSWORD=
```

NEXT_PUBLIC_SUPABASE_URL - 프로젝트 URL 

NEXT_PUBLIC_SUPABASE_ANON_KEY= API Key Anon은 퍼블릭

NEXT_SUPABASE_SERVICE_ROLE= 매우 중요 View API Settings -> service_role

NEXT_SUPABASE_DB_PASSWORD= db 생성시 입력한 password



 "generate-types": "npx supabase gen types typescript --project-id [project_id] --schema public > types_db.ts"

 projectId를 통해 프로젝트 아이디를 식별하고 타입을 generate

 ```
 npx supabase login
```

로그인을 수행하여 supabase의 내 프로젝트에 권한이 있음을 인증해야 정상적인 동작 가능 || 모노레포 이용시 해당 모노레포 워크스페이스에서 로그인 수행이 필요함



## pnpm type error

```tsx
"use client";

import { createBrowserClient } from "@supabase/ssr";

export const createBrowserSupabaseClient = (): ReturnType<typeof createBrowserClient> =>
  createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

```


모노레포 pnpm 사용시 심볼릭 링크로 인해 에러가 발생하는 경우가 있습니다.

까다로운 버그이지만 가장 쉬운 해결책은 리턴타입을 명시해주는 것입니다.

```tsx
"use server";

import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "types_db";

export const createServerSupabaseClient = async (
  cookieStore: ReturnType<typeof cookies> = cookies(),
  admin = false,
): Promise<ReturnType<typeof createServerClient>> => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    admin ? process.env.NEXT_SUPABASE_SERVICE_ROLE! : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    },
  );
};

export const createServerSupabaseAdminClient = async (cookieStore: ReturnType<typeof cookies> = cookies()) => {
  return createServerSupabaseClient(cookieStore, true);
};

```

서버측은 따로 만듭니다.

미들웨어

app/middleware.tsx

```tsx
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const applyMiddlewareSupabaseClient = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // If the cookie is updated, update the cookies for the request and response
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          // If the cookie is removed, update the cookies for the request and response
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  // refreshing the auth token
  await supabase.auth.getUser();

  return response;
};

export async function middleware(request: NextRequest) {
  return await applyMiddlewareSupabaseClient(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

```

