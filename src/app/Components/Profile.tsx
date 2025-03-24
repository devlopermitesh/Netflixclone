"use client"; // Next.js client-side component

import Image from "next/image"; // Next.js ke liye optimized image handling
import { twMerge } from "tailwind-merge";

// Shape Enum
const ProfileShape = {
  Rounded: "rounded",
  Corner: "corner",
  Square: "square",
};

// Props Type
type ProfileProps = {
  imageUrl?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | number; // Predefined ya custom size
  alt?: string;
  shape?: keyof typeof ProfileShape; // Enum values
} & React.HTMLAttributes<HTMLDivElement>; // Extra props

const Profile = ({
  imageUrl,
  className = "",
  size = "md",
  alt = "Profile",
  shape = "Rounded",
  ...props
}: ProfileProps) => {
  // Size Mapping
  const sizeMap = {
    sm: 40, // 40px
    md: 64, // 64px
    lg: 96, // 96px
  };
  const pixelSize = typeof size === "number" ? size : sizeMap[size];

  // Shape Classes
  const shapeClasses = {
    Rounded: "rounded-full",
    Corner: "rounded-md",
    Square: "rounded-none",
  };

  return (
    <div
      className={twMerge(
        "flex overflow-hidden bg-gray-200 items-center justify-center text-gray-700",
        shapeClasses[shape],
        className
      )}
      style={{ width: pixelSize, height: pixelSize }}
      {...props}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={alt}
          width={pixelSize}
          height={pixelSize}
          className="object-cover w-full h-full"
          priority={shape === "Rounded"} // Performance optimization
        />
      ) : (
        <span className="text-xl font-semibold">{alt[0]?.toUpperCase()}</span>
      )}
    </div>
  );
};

export default Profile;
