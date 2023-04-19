import {ChangeEvent, useCallback, useLayoutEffect, useState} from 'react';
import Head from 'next/head';
import {NextPage} from 'next';
import {
    Select,
    TextInput,
    Group,
    Title,
    Stack,
    Skeleton,
    Text,
    Container,
    UnstyledButton,
    SelectItem, Grid,
} from '@mantine/core';
import {useDebouncedValue} from '@mantine/hooks';
import {IconSearch, IconX, IconSelector} from '@tabler/icons-react';
import {ColumnDef, RowSelectionState, SortingState} from '@tanstack/react-table';
import { ref} from "firebase/storage";

import {Table} from 'components';

import {userTypes, userApi} from 'resources/user';

import {DatePickerInput, DatesRangeValue} from '@mantine/dates';
import ImageContainer from "../../components/Table/Table";
import {storage} from "../../config/firebase";

interface UsersListParams {
    page?: number;
    perPage?: number;
    searchValue?: string;
    sort?: {
        createdOn: 'asc' | 'desc';
    };
    filter?: {
        createdOn?: {
            sinceDate: Date | null;
            dueDate: Date | null;
        };
    };
}

const selectOptions: SelectItem[] = [
    {
        value: 'newest',
        label: 'Newest',
    },
    {
        value: 'oldest',
        label: 'Oldest',
    },
];

const columns: ColumnDef<userTypes.User>[] = [
    {
        accessorKey: 'firstName',
        header: 'First Name',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'lastName',
        header: 'Last Name',
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
    },
];

const PER_PAGE = 5;

const Gallery: NextPage = () => {
    const [search, setSearch] = useState('');
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [sortBy, setSortBy] = useState(selectOptions[0].value);
    const [filterDate, setFilterDate] = useState<DatesRangeValue>();

// Create a root reference
    const mountainsRef = ref(storage, 'gs://gallery-e1684.appspot.com/Снимок экрана 2023-04-10 в 02.58.52.png');
    console.log(mountainsRef, 'mountainsRef')

    const [params, setParams] = useState<UsersListParams>({});

    const [debouncedSearch] = useDebouncedValue(search, 500);

    const handleSort = useCallback((value: string) => {
        setSortBy(value);
        setParams((prev) => ({
            ...prev,
            sort: value === 'newest' ? {createdOn: 'desc'} : {createdOn: 'asc'},
        }));
    }, []);

    const handleSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, []);

    const handleFilter = useCallback(([sinceDate, dueDate]: DatesRangeValue) => {
        setFilterDate([sinceDate, dueDate]);

        if (!sinceDate) {
            setParams((prev) => ({
                ...prev,
                filter: {},
            }));
        }

        if (dueDate) {
            setParams((prev) => ({
                ...prev,
                filter: {createdOn: {sinceDate, dueDate}},
            }));
        }
    }, []);

    useLayoutEffect(() => {
        setParams((prev) => ({...prev, page: 1, searchValue: debouncedSearch, perPage: PER_PAGE}));
    }, [debouncedSearch]);

    const {data, isLoading: isListLoading} = userApi.useList(params);
    console.log(data)

    return (
        <>
            <Head>
                <title>Gallery</title>
            </Head>
            <Stack spacing="lg">
                <Group noWrap position="apart">

                </Group>
                {isListLoading && (
                    <>
                        {[1, 2, 3].map((item) => (
                            <Skeleton
                                key={`sklton-${String(item)}`}
                                height={50}
                                radius="sm"
                                mb="sm"
                            />
                        ))}
                    </>
                )}
                {data?.items.length ? (
                    <ImageContainer
                        columns={columns}
                        data={data.items}
                        dataCount={data.count}
                        rowSelection={rowSelection}
                        setRowSelection={setRowSelection}
                        sorting={sorting}
                        onSortingChange={setSorting}
                        onPageChange={setParams}
                        perPage={PER_PAGE}
                    />
                ) : (
                    <Container p={75}>
                        <Text size="xl" color="grey">
                            No results found, try to adjust your search.
                        </Text>
                    </Container>
                )}
            </Stack>
        </>
    );
};

export default Gallery;
