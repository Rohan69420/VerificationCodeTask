const devConfig = {
  baseUrl: "https://verification-code-task-backend.vercel.app/verifycode",
};

const prodConfig = {
  baseUrl: "https://verification-code-task-backend.vercel.app/verifycode",
};

if (process.env.NODE_ENV == "production") {
  config = prodConfig;
} else {
  config = devConfig;
}

export default config;
