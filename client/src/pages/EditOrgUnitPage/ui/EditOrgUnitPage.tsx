import { memo, useCallback  } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button";
import { Skeleton } from "@/shared/ui/Skeleton";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";
import { Page } from "@/widgets/Page";



const EditOrgUnitPage = memo(() => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();

    const onReturnHandler = useCallback(() =>navigate(-1), [navigate]);

    const loadingPage = (
        <VStack gap="16" max>
            <HStack gap="16" max>
                <Text text={'GUID'} />
                <Text text={id} />
            </HStack>
            <HStack max gap="16">
                <Skeleton height={200} width={340}/>
                <VStack gap="16" max>
                    <Skeleton height={100}/>
                    <Skeleton height={140}/>
                </VStack>
            </HStack>
            <Skeleton height={140}/>
            <Skeleton height={140}/>
            <HStack
                justify="end"
                align="center"
                gap="16"
                max
            >
                <Button disabled>Сохранить</Button>
                <Button onClick={onReturnHandler}>
                    Отмена
                </Button>
            </HStack>
        </VStack>
    )
    
    return (
        <Page header="Страница редактирования оргЮнита">
            {loadingPage}
        </Page>
    );
});

export default EditOrgUnitPage;
