import { memo, useCallback, useState, useEffect} from 'react';

import { createOrgUnitItem, OrgUnitCreateData } from '@/entities/OrgUnitItem';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Input } from '@/shared/ui/Input';
import { Modal } from '@/shared/ui/Modal';
import { ListBox, ListBoxItem } from '@/shared/ui/Popups';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './CreateOrgUnitModal.module.scss';

interface Props {
	className?: string;
    isOpen: boolean;
    onCloseModal: () => void;
    updateUserNav: () => Promise<void>
    orgUnitsList: ListBoxItem<string>[]
}

const CreateOrgUnitModal = memo((props: Props) => {

    const { className, orgUnitsList, onCloseModal, isOpen, updateUserNav } = props;
    const [closingStatus, setClosingStatus] = useState(false);

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [parentOrgUnitId, setParentOrgUnitId] = useState('')
    const [workingHours, setWorkingHours] = useState('')
    const [lunchBreak, setLunchBreak] = useState('')
    const [summary, setSummary] = useState('')
    

    useEffect(() => {
        setClosingStatus(false)
    }, [closingStatus]);

    const resetToDefault = useCallback( () => {
        setName('')
        setDescription('')
        setParentOrgUnitId('')
        setWorkingHours('')
        setLunchBreak('')
        setSummary('')
    }, []);

    const createHandler = useCallback(async () => {
        const data: OrgUnitCreateData = {
            name,
            description,
            workingHours,
            lunchBreak,
            summary,
            parentOrgUnitId: parentOrgUnitId || null
        }

        await createOrgUnitItem({...data})
        await updateUserNav()
        setClosingStatus(true)
        //TODO: добавить вывод ошибки если что-то пошло не так
        resetToDefault()
    }, [description, lunchBreak, name, parentOrgUnitId, resetToDefault, summary, updateUserNav, workingHours]);

    const closingHandler = useCallback(() => {
        setClosingStatus(true)
        resetToDefault()
    }, [resetToDefault]);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onCloseModal}
            lazy
            className={classNames(cls.OpenPrintModal, {}, [className ])}
            closeStatus={closingStatus}
        >
            <VStack gap='24' justify='between'>


                <Text title='Создание отдела' size="xl"/>
                <Card border='border-slightly' padding='24' max className={classNames(cls.card, {}, [className])}>
                    <VStack gap="24" max>

                        <Text title="Информация о подразделении" size="l"/>

                        <VStack gap="16" max>
                    
                            <HStack gap="4" max>
                                <Text title={'Название подразделения:'} thin className={cls.text}/>
                                <Input 
                                    inputVariant="bordered"
                                    placeholder="Название подразделения"
                                    value={name}
                                    onChange={setName}
                                />
                            </HStack>
                            <HStack gap="4" max>
                                <Text title="Описание подразделения:" thin className={cls.text}/>
                                <Input
                                    inputVariant="bordered"
                                    placeholder="Описание подразделения"
                                    value={description}
                                    onChange={setDescription}
                                />
                            </HStack>

                            <HStack gap="4" max>
                                <Text title="ID родителя (опционально):" thin className={cls.text}/>

                                <ListBox
                                    className={cls.listbox}
                                    items={orgUnitsList}
                                    value={parentOrgUnitId}
                                    defaultValue='Опционально'
                                    onChange={setParentOrgUnitId}
                                />

                            </HStack>


                            <HStack gap="4">

                                <Text title="Расписание (опционально):" thin className={cls.text}/>

                                <HStack gap="16" className={cls.workingHours}>
                                    <Text title="Часы работы:" thin />
                                    <Input
                                        inputVariant="bordered"
                                        className={cls.additionalInput}
                                        placeholder="Часы работы"
                                        value={workingHours}
                                        onChange={setWorkingHours}
                                    />
                                </HStack>

                                <HStack>
                                    <Text title="Обеденный перерыв:" thin withoutWrap className={cls.additionalText}/>
                                    <Input
                                        inputVariant="bordered"
                                        className={cls.additionalInput}
                                        placeholder="Обеденный перерыв"
                                        value={lunchBreak}
                                        onChange={setLunchBreak}
                                    />
                                </HStack>

                            </HStack>



                            <HStack gap="4" max align='start'>
                                <Text
                                    title="Дополнителная информация:"
                                    thin
                                    className={classNames(cls.text, {}, [cls.additionalInfo])}
                                />
                                <Input
                                    isTextArea
                                    textareaVaraint="big"
                                    className={cls.textarea}
                                    placeholder="Дополнителная информация (опционально)"
                                    value={summary}
                                    onChange={setSummary}
                                />
                            </HStack>
                    
                        </VStack>

                    </VStack>
                </Card>

                <HStack justify="end" align="center" gap='16' max>
                    <Button onClick={createHandler} variant='outline-inverted' className={cls.btn}>Создать</Button>
                    <Button onClick={closingHandler} variant='outline-inverted' className={cls.btn}>Закрыть</Button>
                </HStack>
            </VStack>
        </Modal>
    );
});

export default CreateOrgUnitModal;