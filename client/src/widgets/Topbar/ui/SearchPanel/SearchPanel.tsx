import { observer } from 'mobx-react';
import { useState, useRef } from 'react';

import { useStoreProvider } from '@/app/providers/StoreProvider';
import { PersonSearched } from '@/entities/Person';
import { CrossInsideCircle } from '@/shared/assets/svg-icons/status';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { Input } from '@/shared/ui/Input';

import cls from './SearchPanel.module.scss';
import { SearchResults } from './SearchResults/SearchResults';
import { UseSearchPanel } from '../../model/lib/useSearchPanel';

interface Props {
	className?: string;
}

export const SearchPanel = observer(({ className }: Props) => {
    const { rootStore } = useStoreProvider();

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(document.activeElement === ref.current);
    
    const [inputValue, setInputValue] = useState('');
    const [searchData, setSearchData] = useState<PersonSearched[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const { keyDownHandler, clickInputHandler } = UseSearchPanel({
        inputValue,
        setInputValue,
        ref,
        searchData,
        isFocused,
        setIsLoading,
        setSearchData,
        setIsFocused
    })

    return (
        <div className={classNames(cls.SearchPanel, {}, [className])}>

            {rootStore.auth && 
                <Input
                    value={inputValue}
                    onChange={setInputValue}
                    placeholder='Поиск...'
                    inputVariant='clear'
                    className={cls.input}
                    onKeyDown={keyDownHandler}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onClick={clickInputHandler}
                />
            }

            <SearchResults 
                inputValue={inputValue}
                searchData={searchData}
                isLoading={isLoading}
                setInputValue={setInputValue}
                setSearchData={setSearchData}
                keyDownHandler={keyDownHandler}
            />

            {inputValue && 
                <Icon
                    Svg={CrossInsideCircle}
                    color='inverted'
                    clickable
                    onClick={() => setInputValue('')}
                    className={cls.clearBtn}
                />
            }

        </div>
    );
});
