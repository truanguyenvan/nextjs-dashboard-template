import React, {useMemo} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Button, Input} from "@nextui-org/react";
import useSWR from "swr";
import {Code} from "@nextui-org/code";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Contents = () => {
    const columns = [
        { name: "NAME", uid: "name" },
        { name: "HEIGHT", uid: "height" },
        { name: "MASS", uid: "mass" },
        { name: "BIRTH_YEAR", uid: "birth_year" },
    ];

    const [page, setPage] = React.useState(1);

    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
        keepPreviousData: true,
    });


    const pages = useMemo(() => {
        return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    }, [data?.count, rowsPerPage]);

    // @ts-ignore
    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    const onRowsPerPageChange = React.useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between">
                    <Code>Total {data?.count}</Code>
                    <Pagination
                        total={pages}
                        color="secondary"
                        page={page}
                        onChange={setPage}
                    />
                    <div className="flex gap-2">
                        <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            onPress={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
                        >
                            Previous
                        </Button>
                        <Button
                            size="sm"
                            variant="flat"
                            color="secondary"
                            onPress={() => setPage((prev) => (prev < 10 ? prev + 1 : prev))}
                        >
                            Next
                        </Button>
                    </div>
            </div>
        );
    }, [data?.count, page, pages]);

    const topContent = React.useMemo(() => {
        return (
                <div className="py-2 px-2 flex justify-end">
                    <Code className="flex items-center text-default-400 text-small">
                        Size:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                            defaultValue={["10"]}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                        </select>
                    </Code>
                </div>
        );
    }, [
        onRowsPerPageChange,
    ]);

    return (
        <Table
            aria-label="Example table with client async pagination"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align="start"
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                items={data?.results ?? []}
                loadingContent={<Spinner />}
                loadingState={loadingState}
            >
                {(item) => (
                    // @ts-ignore
                    <TableRow key={item?.name}>
                        {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
