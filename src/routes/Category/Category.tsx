import FormSection from "@/components/CategoryPage/FormSection";
import HeroSection from "@/components/CategoryPage/HeroSection";
import { categories } from "@/db/categories";
import { Navigate, useParams } from "react-router-dom";

export default function Category() {
  const { categoryName } = useParams();

  if (!categoryName) {
    return <Navigate to={"/"} replace />;
  }

  const category = categories.find(
    (singleCategory) => singleCategory.href === categoryName,
  );

  if (!category) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="flex flex-col md:min-h-[100dvh] md:flex-row">
      <HeroSection category={category} />

      <FormSection />
    </div>
  );
}
