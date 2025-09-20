import { NewsEntity } from "../../../domain/entities";
import { NewsRepository } from "../../../domain/repositories/news/news.repository";
import { CreateNewsDto } from "../../../domain/dto/news/createNews.dto";
import { SearchNewsQueryParamsDto } from "../../../domain/dto/news/searchNews.dto";
import { UpdateNewsDto } from "../../../domain/dto/news/updateNews.dto";
import { NewsDatasource } from "../../../domain/datasources/news/news.datasource";


export class NewsRepositoryImplementation implements NewsRepository {

    constructor(
        private readonly datasource: NewsDatasource
    ){}
    getNewById(id: string): Promise<NewsEntity> {
        return this.datasource.getNewsById(id)
    }
    getNews(dto: SearchNewsQueryParamsDto): Promise<[NewsEntity[], number]> {
        return this.datasource.getNews(dto)
    }
    createNews(dto: CreateNewsDto): Promise<NewsEntity> {
        return this.datasource.createNews(dto)
    }
    updateNews(dto: UpdateNewsDto, id: string): Promise<NewsEntity> {
        return this.datasource.updateNews(dto, id)
    }
    deleteNews(id: string): Promise<string> {
        return this.datasource.deleteNews(id)
    }
}