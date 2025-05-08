"use client";

import EditingCategoryItem from "@/app/ui/categories/editing-category-item";
import InitialCategoryItem from "@/app/ui/categories/initial-category-item";
import { useState } from "react";

type CategoryItemProps = {
    name: string,
    emoji: string,
    numberOfExpenses: number,
};

export default function CategoryItem({
    name,
    emoji,
    numberOfExpenses,
}: CategoryItemProps) {
    const [beingEdited, setBeingEdited] = useState(false);

    return <>
        {!beingEdited ?
            <InitialCategoryItem
                name={name}
                emoji={emoji}
                numberOfExpenses={numberOfExpenses}
                setBeingEdited={setBeingEdited}
            />
            :
            <EditingCategoryItem
                name={name}
                emoji={emoji}
                setBeingEdited={setBeingEdited}
            />
        }
    </>;
}