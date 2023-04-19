module.exports = {
  presets: ["@babel/preset-env", "@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true,
      },
    ],
  ],
};
