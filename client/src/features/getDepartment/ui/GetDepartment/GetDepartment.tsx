import { observer } from "mobx-react";
import { useEffect } from 'react';

import { Loader } from "@/shared/ui/Loader";
import { VStack } from "@/shared/ui/Stack";

import { OpeningPageAnimation } from "../../anim/OpeningPageAnimation";
import { createOrgUnitCardStore } from "../../lib/getOrgUnitCardStore";
import { fetchDepartment } from "../../model/services/fetchDepartment";
import departmentStore from "../../model/store/departmentStore";
import { Department } from "../Department/Department";


interface GetDepartmentProps {
    id: string
}

export const GetDepartment = observer((props: GetDepartmentProps) => {
    const {id} = props;

    useEffect( ()=> {
        fetchDepartment(id);
    }, [id])

    const data = departmentStore.departmentsData?.case({
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
                        <Department department={value} store={createOrgUnitCardStore(value.id)}/>
                    </OpeningPageAnimation>
                </VStack>
            );
        }
    })
    return data;
});

