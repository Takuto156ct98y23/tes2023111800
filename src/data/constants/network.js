const getBackendUrl = () => {
  if (
    typeof process.env.REACT_APP_BACKEND_URL_TEST_PUBLIC === "string" &&
    0 < process.env.REACT_APP_BACKEND_URL_TEST_PUBLIC.length
  ) {
    return process.env.REACT_APP_BACKEND_URL_TEST_PUBLIC;
  }

  switch (process.env.NODE_ENV) {
    case "development":
      return "http://localhost:3001";
    default:
      return "https://ricespeak.com";
  }
};
const _BackendUrl = getBackendUrl();

export const REACT_APP_BACKEND_URL = _BackendUrl;

// 使ってない
const getS3BucketUserImageUrl = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return "";
    default:
      return "";
  }
};
export const S3_BUCKET_USERIMAGE_URL = getS3BucketUserImageUrl();
