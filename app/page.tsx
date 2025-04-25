import Categories from "@/app/ui/categories";
import CreateCategory from "@/app/ui/create-category";

export default async function Page() {
  return (
    <>
      <CreateCategory />
      <Categories />
    </>
  );
}