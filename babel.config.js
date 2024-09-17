module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ["nativewind/babel"],
    
  };
};

// For nativewind to work for me... 
// tailwind.config.js 
// content: [ 
//     "./components/**/*.{js,jsx,ts,tsx}",
//     "./app/**/*.{js,jsx,ts,tsx}",],  
// then ctrl+c in terminal to exit
// rerun ' npx expo start -c'
// then Press 'r' in terminal to reload
