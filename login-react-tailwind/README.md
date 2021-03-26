# Xem video hướng dẫn cài đặt môi trường cho TailwindCSS và Reactjs 
[Video cài đặt TailwindCSS và Reactjs ](https://youtu.be/mH70NERP3fk)

# Cài đặt Tailwindcss
[Setup Tailwindcss docs](https://tailwindcss.com/docs/installation#using-a-custom-css-file)
mkdir -p src dist
/* ./src/tailwind.css */
```
@tailwind base;
@tailwind components;

.btn {
  @apply px-4 py-2 bg-blue-600 text-white rounded;
}

@tailwind utilities;
```
npx tailwindcss-cli@latest build ./src/tailwind.css -o ./dist/tailwind.css

# Cài đặt reactjs
[Setup Reactjs docs](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app)

```
npx create-react-app login-react-tailwind
cd login-react-tailwind
npm start
```

