import React, {useMemo} from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Button, Input} from "@nextui-org/react";
import useSWR from "swr";
import {SearchIcon} from "@components/icons/searchicon"

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const Contents = () => {
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterValue, setFilterValue] = React.useState("");

    const {data, isLoading} = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
        keepPreviousData: true,
    });


    const pages = useMemo(() => {
        return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    }, [data?.count, rowsPerPage]);

    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onSearchChange = React.useCallback((value: any) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);


    const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])


    const onRowsPerPageChange = React.useCallback((e: any) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="text-default-400 text-small">Total {30} users</span>

                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [30, page, pages]);

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
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
            <TableHeader>
                <TableColumn key="name">Name</TableColumn>
                <TableColumn key="height">Height</TableColumn>
                <TableColumn key="mass">Mass</TableColumn>
                <TableColumn key="birth_year">Birth year</TableColumn>
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
