import ky from "ky";

const projectId = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_ID;

const instance = ky.create({
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_POSTHOG_ADMIN_KEY}`,
    "Content-Type": "application/json",
  },
  prefixUrl: "https://us.i.posthog.com/api",
  credentials: "include",
});

export const getFeatureFlag = () => {
  return instance.get(`projects/${projectId}/feature_flags`);
};

export const getExperiments = () => {
  return instance.get(`projects/${projectId}/experiments`);
};

export const clientGetFeatureFlag = async () => {
  const response = await ky.get("/api/posthog/featureflag");
  return response.json();
};

export const clientGetExperiments = async () => {
  const response = await ky.get("/api/posthog/experiments");
  return response.json();
};
