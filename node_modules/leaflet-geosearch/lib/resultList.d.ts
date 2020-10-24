import { SearchResult } from './providers/provider';
interface ResultListProps {
    handleClick: (args: {
        result: SearchResult;
    }) => void;
    classNames?: {
        container?: string;
        item?: string;
    };
}
export default class ResultList {
    handleClick?: (args: {
        result: SearchResult;
    }) => void;
    selected: number;
    results: SearchResult[];
    container: HTMLDivElement;
    resultItem: HTMLDivElement;
    constructor({ handleClick, classNames }: ResultListProps);
    render(results?: SearchResult[]): void;
    select(index: number): SearchResult;
    count(): number;
    clear(): void;
    onClick: (event: Event) => void;
}
export {};
