import {ChangeEvent, useCallback, useLayoutEffect, useState} from 'react';
import Head from 'next/head';
import {NextPage} from 'next';
import {
    Group,
    Stack,
    Skeleton,
    Text,
    Container,
    SelectItem,
} from '@mantine/core';
import {useDebouncedValue} from '@mantine/hooks';
import {ColumnDef, RowSelectionState, SortingState} from '@tanstack/react-table';
import {userTypes, userApi} from 'resources/user';
import ImageContainer from "../../components/Table/Table";
import {Dropzone, FileWithPath} from "@mantine/dropzone";
import {getStorage, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../config/firebase";
import {accountApi} from 'resources/account';
import {photoApi} from "../../resources/photo";
import {z} from "zod";

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

const storageRef = ref(storage, 'images/');


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

const MyGallery: NextPage = () => {
    const [search, setSearch] = useState('');
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);
    const [params, setParams] = useState<UsersListParams>({});
    const [debouncedSearch] = useDebouncedValue(search, 500);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const {data: account} = accountApi.useGet();
    console.log(account)

    const schema = z.object({
        _id: z.string(),
        userId: z.string(),
        title: z.string(),
        firebaseUrl: z.string()
    });
    type UpdateParams = z.infer<typeof schema>;
    const {
        mutate: uploadPhoto,
        isLoading: isUploadPhotoLoading,
    } = photoApi.uploadPhoto<UpdateParams>();
    const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
        uploadBytes(storageRef, imageFile).then((snapshot) => {
            let data = account ? {
                _id: '1234323412',
                userId: account._id,
                title: 'heh',
                firebaseUrl: 'sdsdasfasf',
            } : {
                _id: `${Date.now()}`,
                userId: 'undefined',
                title: 'heh',
                firebaseUrl: snapshot.ref,
            }
            uploadPhoto(data)
            console.log('Uploaded a blob or file!', snapshot)
        });

        /*setErrorMessage(null);
        console.log(imageFile, 'image')

        if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
            const body = new FormData();
            body.append('file', imageFile, imageFile.name);

            await uploadProfilePhoto(body, {
                onError: (err) => handleError(err),
            });
        }*/
    };

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
                <Stack align='center'>
                    <Dropzone name="avatarUrl"
                              accept={['image/png', 'image/jpg', 'image/jpeg']}
                              onDrop={handlePhotoUpload}
                    >
                        <Text>Upload Photo</Text>
                    </Dropzone>
                </Stack>
                <Group noWrap position="apart">
                </Group>
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

export default MyGallery;
