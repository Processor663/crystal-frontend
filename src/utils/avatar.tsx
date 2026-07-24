// type AvatarProps = {
//   name: string;
//   image?: string;
// };

// function Avatar({ name, image }: AvatarProps) {
//   const initials = name
//     .trim()
//     .split(/\s+/)
//     .slice(0, 2)
//     .map((word) => word[0].toUpperCase())
//     .join("");

//   if (image) {
//     return (
//       <img
//         src={image}
//         alt={name}
//         className="h-10 w-10 rounded-full object-cover"
//       />
//     );
//   }

//   return (
//     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
//       {initials}
//     </div>
//   );
// }