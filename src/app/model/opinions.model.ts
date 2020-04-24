import { OpinionProduct } from './opinionProduct.model';

export class Opinions{
    comments: OpinionProduct[];
    totalPages: number;
    currentPage: number;
    commentsCounter: number;
}