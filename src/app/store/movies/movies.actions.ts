import { SearchParams } from '../../features/movies/models/form.model';

export namespace Movies {
  export class FetchMovies {
    public static readonly type = '[Movies] Fetch Movies';

    constructor(public params: SearchParams) {}
  }

  export class FetchMovie {
    public static readonly type = '[Movies] Fetch Movie';

    constructor(public id: string) {}
  }

  export class StoreSearchPrams {
    public static readonly type = '[Movies] Store Search Params';

    constructor(public params: SearchParams) {}
  }
}
