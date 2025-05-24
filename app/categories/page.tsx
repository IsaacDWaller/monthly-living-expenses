import Categories from "@/app/ui/categories/categories";
import CreateCategory from "@/app/ui/categories/create-category";

export default async function Page() {
    return <>
        <CreateCategory />
        <Categories />
    </>;
}