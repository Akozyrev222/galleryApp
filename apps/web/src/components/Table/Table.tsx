import {useMemo, useCallback, useState, FC} from 'react';
import {
    Table as TableContainer,
    Checkbox,
    Pagination,
    Group,
    Text,
    Paper, Grid, Image, SimpleGrid, Stack, useMantineTheme, Skeleton, AspectRatio, StarIcon, Rating,
} from '@mantine/core';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    OnChangeFn,
    PaginationState,
    RowData,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';

type SpacingSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface TableProps {
    data: RowData[];
    dataCount?: number;
    columns: ColumnDef<any>[];
    horizontalSpacing?: SpacingSizes;
    verticalSpacing?: SpacingSizes;
    rowSelection?: RowSelectionState;
    setRowSelection?: OnChangeFn<RowSelectionState>;
    sorting?: SortingState;
    onSortingChange?: OnChangeFn<SortingState>;
    onPageChange?: (value: Record<string, any>) => void;
    perPage: number;
    page?: number;
}

const ImageContainer: FC<TableProps> = ({
                                            data,
                                            dataCount,
                                            columns,
                                            horizontalSpacing = 'xl',
                                            verticalSpacing = 'lg',
                                            rowSelection,
                                            setRowSelection,
                                            sorting,
                                            onSortingChange,
                                            onPageChange,
                                            page,
                                            perPage,
                                        }) => {


    const images = [
        {
            src: 'https://media.istockphoto.com/id/499206036/photo/cityscape-of-minsk-belarus-summer-season-sunset-time.jpg?s=612x612&w=0&k=20&c=-Lb_1Snzj-Vg-iKlHdQ4myRSuyS7R8ow6FV3bMiSnQ0=',
            title: 'Minsk'
        },
        {
            src: 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80',
            title: 'Man'
        },
        {
            src: 'https://thumbs.dreamstime.com/b/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpg',
            title: 'Ladder'
        },
        {
            src: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            title: 'Feather'
        },
        {
            src: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Ym9va3xlbnwwfHwwfHw%3D&w=1000&q=80',
            title: 'Book'
        },
    ]
    return (
        <>
            <Paper radius="sm" withBorder>
                <SimpleGrid cols={4} breakpoints={[{maxWidth: 'xs', cols: 1}]}>
                    {/*<Grid.Col span={4}>1</Grid.Col>
                        <Grid.Col span={4}>2</Grid.Col>
                        <Grid.Col span={4}>3</Grid.Col>
                        <Grid.Col span={4}>4</Grid.Col>
                        <Grid.Col span={4}>5</Grid.Col>*/}
                    {images.map((el, index) => {
                            let img = document.createElement('img');
                            img.id = 'imgId';
                            img.src = el.src
                            console.log(img.clientHeight)
                            return (
                                <Paper withBorder>
                                    <AspectRatio ratio={150 / 200}>
                                        <Image src={el.src}/>
                                    </AspectRatio>
                                    <Group position='apart'>
                                        <Text align='center'>{el.title}</Text>
                                        <Rating size='sm' value={1} id={el.src} />
                                    </Group>
                                </Paper>
                            )
                        }
                    )}
                </SimpleGrid>
            </Paper>
            <Group position="right">
            </Group>
        </>
    );
};

export default ImageContainer;
