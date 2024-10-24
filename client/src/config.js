const devConfig = {
  baseUrl: "https://verification-code-task-backend.vercel.app",
};

const prodConfig = {
  baseUrl: "https://verification-code-task-backend.vercel.app",
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config; 
