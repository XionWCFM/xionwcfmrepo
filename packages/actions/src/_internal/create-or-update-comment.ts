export const createOrUpdateComment = async (
  body: string,
  signatureText: string,
  { github, context }: { github: any; context: any },
) => {
  const owner = context.repo.owner;
  const repo = context.repo.repo;
  const issue_number = context.issue.number;

  const { data: comments } = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });

  //@ts-ignore
  const existingComment = comments.find((comment) => comment?.body?.includes(signatureText));

  if (existingComment) {
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: existingComment.id,
      body,
    });
  } else {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
  }
};
