import { Fetcher } from './fetcher';
import Promise = require('bluebird');
let urlJoin = require('url-join');
import { SalesforceOptions, formatApiVersion } from './salesforceOptions'
import { RequestOptions } from './requestOptions';
import * as querystring from 'querystring';


export class FetchQuery {
    fetcher: Fetcher;
    options: SalesforceOptions;

    static Create(fetcher: Fetcher, options: SalesforceOptions): FetchQuery {
        return new FetchQuery(fetcher, options);
    }

    constructor(fetcher: Fetcher, options: SalesforceOptions){
        this.fetcher = fetcher;
        this.options = options;
    }

    private getBaseDataURL(){
        let apiVersion = formatApiVersion(this.options.apiVersion);
        return urlJoin(this.options.instanceURL, 'services/data', apiVersion);
    }

    query(soqlQuery: string): Promise<any> {
        let encodedQuery = '?' + querystring.stringify({ q: soqlQuery });
        let fetchUrl = urlJoin(this.getBaseDataURL(), 'query', encodedQuery);

        let fetchOptions: RequestOptions = {
            method: 'GET',
            cache: 'no-cache'
        };
        return this.fetcher.fetchJSON(fetchUrl, fetchOptions);
    }
}