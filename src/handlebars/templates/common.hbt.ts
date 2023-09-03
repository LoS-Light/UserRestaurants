
import { Request } from 'express';
import querystring from 'querystring';

export function getHandlebarsPageItems(pageNum: number, pageCount: number, queryKey: string, request: Request) {
    const query: Record<string, any> = request.query;
    let ret = '';

    for (let i = 1; i <= pageCount; i++) {
        const active = i === pageNum ? ' active' : '';
        query[queryKey] = `${i}`;
        const href = `${request.path}?${querystring.stringify(query)}`;
        ret = ret + `<li class="page-item${active}"><a class="page-link" href="${href}">${i}</a></li>`;
    }
    return ret;
}