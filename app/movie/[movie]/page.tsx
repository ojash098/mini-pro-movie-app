"use client";
import { useParams } from "next/navigation";

export default function moviePage() {
  const { movie } = useParams();

  return (
    <div>
      moviePage
      <p>{movie}</p>
    </div>
  );
}
