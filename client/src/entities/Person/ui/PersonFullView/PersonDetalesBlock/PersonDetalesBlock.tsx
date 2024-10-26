import { observer } from 'mobx-react';
import { useCallback, useEffect, useState } from 'react';

import { PersonDetales, PersonDetalesUpdateData } from '@/entities/Person/model/types/person';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

import cls from './PersonDetalesBlock.module.scss';

interface Props {
	className?: string;
    isEdit: boolean;
    isCancelled: boolean;
    personDetales: PersonDetales
    setUpdatedPersonDetales: React.Dispatch<React.SetStateAction<PersonDetalesUpdateData | null>>
}

export const PersonDetalesBlock = observer((props: Props) => {

    const { className, isEdit, isCancelled, personDetales, setUpdatedPersonDetales } = props

    const [items, setItems] = useState(personDetales.items);
    const [hardware, setHardware] = useState(personDetales.hardware);
    const [software, setSoftware] = useState(personDetales.software);
    const [exams, setExams] = useState(personDetales.exams);

    const resetToDefault = useCallback(() => {
        setItems(personDetales.items)
        setHardware(personDetales.hardware)
        setSoftware(personDetales.software)
        setExams(personDetales.exams)
    }, [personDetales.exams, personDetales.hardware, personDetales.items, personDetales.software])

    useEffect(() => {
        setUpdatedPersonDetales({
            items: items,
            hardware: hardware,
            software: software,
            exams: exams
        }
        )
    }, [items, hardware, software, exams, setUpdatedPersonDetales])

    useEffect(() => {
        resetToDefault()
    } ,[isCancelled, resetToDefault])

    return (
        <Card border='border-slightly' padding='24' max className={classNames(cls.PersonDetalesBlock, {}, [className])}>
            <VStack gap="16" max >
                <Text title="Детализация сотрудника" size="xl"/>
                <VStack gap="8" max>
                    <HStack gap="8" max>
                        <Text title={'Оборудование:'} thin className={cls.text}/>
                        <Input
                            inputVariant="clear"
                            className={cls.input}
                            placeholder="Оборудование"
                            value={items}
                            onChange={setItems}
                            readonly={!isEdit}
                        />
                    </HStack>
                    <HStack gap="8" max>
                        <Text title={'Техника:'} thin className={cls.text}/>
                        <Input
                            inputVariant="clear"
                            className={cls.input}
                            placeholder="Техника"
                            value={hardware}
                            onChange={setHardware}
                            readonly={!isEdit}
                        />
                    </HStack>
                    <HStack gap="8" max>
                        <Text title={'Програмное обеспечение:'} thin className={cls.text} withoutWrap/>
                        <Input
                            inputVariant="clear"
                            className={cls.input}
                            placeholder="Программное обеспечение"
                            value={software}
                            onChange={setSoftware}
                            readonly={!isEdit}
                        />
                    </HStack>
                    <HStack gap="8" max>
                        <Text title={'Пройденные курсы:'} thin className={cls.text} withoutWrap/>
                        <Input
                            inputVariant="clear"
                            className={cls.input}
                            placeholder="Пройденные курсы"
                            value={exams}
                            onChange={setExams}
                            readonly={!isEdit}
                        />
                    </HStack>
                </VStack>
            </VStack>
        </Card>
    );
});
