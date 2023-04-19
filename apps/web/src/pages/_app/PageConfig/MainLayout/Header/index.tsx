import {memo, FC} from 'react';
import {RoutePath} from 'routes';
import {
    Header as LayoutHeader,
    Container,
} from '@mantine/core';
import {Link} from 'components';
import {GalleryImage, LogoImage} from 'public/images';

import {accountApi} from 'resources/account';

import UserMenu from './components/UserMenu';
import ShadowLoginBanner from './components/ShadowLoginBanner';
import {createStyles, Menu, Group, Center, Burger, rem} from '@mantine/core';
import {useRouter} from "next/router";

const useStyles = createStyles((theme) => ({
    inner: {
        height: rem(56),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: `${rem(8)} ${rem(12)}`,
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: rem(5),
    },
}));


const Header: FC = () => {
    const {data: account} = accountApi.useGet();

    const router = useRouter();

    const {classes} = useStyles();

    if (!account) return null;

    return (
        <LayoutHeader height="72px">
            {account.isShadow && <ShadowLoginBanner email={account.email}/>}
            <Container
                sx={(theme) => ({
                    minHeight: '72px',
                    padding: '0 32px',
                    display: 'flex',
                    flex: '1 1 auto',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: theme.white,
                    borderBottom: `1px solid ${theme.colors.gray[4]}`,
                })}
                fluid
            >
                <Link type="router" href={RoutePath.Gallery}>
                    <GalleryImage/>
                </Link>
                <Container>
                    <div className={classes.inner}>
                        <Group spacing={5} className={classes.links}>
                            <Menu trigger="hover" transitionProps={{exitDuration: 0}} withinPortal>
                                <Menu.Target>
                                    <Link underline={false} type='router' href={RoutePath.Gallery}>
                                        <a
                                            className={classes.link}
                                        >
                                            <Center>
                                                <span className={classes.linkLabel}>Gallery</span>
                                            </Center>
                                        </a>
                                    </Link>
                                </Menu.Target>
                            </Menu>
                            <Menu trigger="hover" transitionProps={{exitDuration: 0}} withinPortal>
                                <Menu.Target>
                                    <Link underline={false} type='router' href={RoutePath.My_gallery}>
                                        <a
                                            className={classes.link}
                                        >
                                            <Center>
                                                <span className={classes.linkLabel}>My Gallery</span>
                                            </Center>
                                        </a>
                                    </Link>
                                </Menu.Target>
                            </Menu>
                        </Group>
                    </div>
                </Container>
                <UserMenu/>
            </Container>
        </LayoutHeader>
    );
};

export default memo(Header);
