/* eslint-disable react-hooks/exhaustive-deps */
import { observer } from "mobx-react";
import { useEffect } from 'react';

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { fetchOrgUnitItem, OrgUnitFullView, createOrgUnitCardStore } from "@/entities/OrgUnitItem";
import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { OpeningPageAnimation } from "../anim/OpeningPageAnimation";

interface GetDepartmentProps {
    id: string
}

export const GetDepartment = observer((props: GetDepartmentProps) => {
    const {id} = props;
    const { orgUnitStore } = useStoreProvider();

    useEffect( ()=> {
        fetchOrgUnitItem(id, orgUnitStore);
    }, [id])

    const data = orgUnitStore.mainOrgUnit?.case({
        pending: () => {
            return (
                <VStack gap='16' max maxHeight align="center" justify="center">
                    <Loader />
                </VStack>
            )
        },
        rejected: () => {throw new Error()},
        fulfilled: (value) => {
            if (value.id !== id) return (
                // Условие для избежание многократных перерисовок-скачков (и ошибок пререрисовки!),
                // если пользователь подряд быстро тыкал по множеству отделов в навигации
                <VStack gap='16' max maxHeight align="center" justify="center">
                    <Loader />
                </VStack>
            )
            return (
                <VStack gap='16'>
                    <OpeningPageAnimation>
                        <OrgUnitFullView
                            orgUnitItem={value}
                            orgUnitStore={orgUnitStore}
                            cardStore={createOrgUnitCardStore(value.id, orgUnitStore)}
                        />
                    </OpeningPageAnimation>
                </VStack>
            );
        }
    })
    return data;
});
