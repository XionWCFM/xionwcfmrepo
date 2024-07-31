import { context, getOctokit } from "@actions/github";

export const createOrUpdateComment = async (body: string, signatureText: string) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = context.issue.number;

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const octokit = getOctokit(process.env.GITHUB_TOKEN!);

  const { data: comments } = await octokit.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });

  const existingComment = comments.find((comment) => comment?.body?.includes(signatureText));

  if (existingComment) {
    await octokit.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body,
    });
  } else {
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
  }
};
