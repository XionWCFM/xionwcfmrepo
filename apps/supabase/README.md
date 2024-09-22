
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

로그인을 수행하여 supabase의 내 프로젝트에 권한이 있음을 인증해야 정상적인 동작 가능


