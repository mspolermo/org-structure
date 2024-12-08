import { observer } from "mobx-react";
import { memo, useCallback, useState } from "react";

import { useStoreProvider } from "@/app/providers/StoreProvider";
import { authLogin } from "@/entities/User";
import { Button } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text";

const GetAuth = observer(() => {
    const { rootStore }= useStoreProvider();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSaveHandler = useCallback(async () => {
        const response = await authLogin ({
            email,
            password,
        }, rootStore)
        console.log(response)
    }, [email, password, rootStore]);

    return (
        <Card border='border-slightly' padding='24' max>
            <VStack gap="16" max>

                <Text title="Пожалуйста авторизируйтесь" />

                <HStack gap="16" max>
                    <Text title={'Email:'} thin />
                    <Input 
                        inputVariant="bordered"
                        placeholder="Введите email"
                        value={email}
                        onChange={setEmail}
                    />
                </HStack>

                <HStack gap="16" max>
                    <Text title={'Пароль:'} thin />
                    <Input 
                        inputVariant="bordered"
                        placeholder="Введите пароль"
                        value={password}
                        onChange={setPassword}
                    />
                </HStack>

                <Button onClick={onSaveHandler}>Войти</Button>
            </VStack>
        </Card>
    );
});

export default GetAuth;
