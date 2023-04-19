import {useState} from 'react';
import {useInterval} from '@mantine/hooks';
import {createStyles, Button, Progress} from '@mantine/core';
import {FileWithPath} from "@mantine/dropzone";

const useStyles = createStyles((theme) => ({
    button: {
        position: 'relative',
        transition: 'background-color 150ms ease',
    },

    progress: {
        ...theme.fn.cover(-1),
        height: 'auto',
        backgroundColor: 'transparent',
        zIndex: 0,
    },

    label: {
        position: 'relative',
        zIndex: 1,
    },
}));
/*type ButtonProgressProps = {
    onPress: ([imageFile]: FileWithPath[]) => Promise<void>
}*/

export function ButtonProgress() {
    const {classes, theme} = useStyles();
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    const interval = useInterval(
        () =>
            setProgress((current) => {
                if (current < 100) {
                    return current + 1;
                }

                interval.stop();
                setLoaded(true);
                return 0;
            }),
        20
    );

    return (
        <Button
            fullWidth
            className={classes.button}
            color={loaded ? 'teal' : theme.primaryColor}
        >
            <div className={classes.label}>
                {progress !== 0 ? 'Uploading files' : loaded ? 'Files uploaded' : 'Upload files'}
            </div>
            {progress !== 0 && (
                <Progress
                    value={progress}
                    className={classes.progress}
                    color={theme.fn.rgba(theme.colors[theme.primaryColor][2], 0.35)}
                    radius="sm"
                />
            )}
        </Button>
    );
}
