import { canViewPost } from "./post.service";
describe("canViewPost의 동작을 테스트합니다.", () => {
  it("canView가 false라면 반환은 false", () => {
    expect(canViewPost({ canView: false, releaseDate: "" }, new Date())).toBe(false);
  });

  it("canView가 true면서 releaseDate가 오늘보다 이르다면 true", () => {
    const date = "2024-06-20T16:00:00Z";
    const today = new Date("2024-06-20T16:00:01Z");
    console.log(today.getTime() > new Date(date).getTime());
    expect(canViewPost({ canView: true, releaseDate: date }, today)).toBe(true);
  });
});
