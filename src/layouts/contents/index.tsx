import Link from "next/link";
import React from "react";
import { TableWrapper } from "@components/table/table";

export const Contents = () => {
    return (
        <div className="my-14 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper />
            </div>
        </div>
    );
};