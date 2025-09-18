import { CreateNewsDto } from "../../dto/news/createNews.dto";
import { SearchNewsQueryParamsDto } from "../../dto/news/searchNews.dto";
import { UpdateNewsDto } from "../../dto/news/updateNews.dto";
import { NewsEntity } from "../../entities";

export interface NewsRepository {
    getNewById(id:string):Promise <NewsEntity>
    getNews(dto: SearchNewsQueryParamsDto): Promise<[NewsEntity[], number]>
    createNews(dto: CreateNewsDto) : Promise<NewsEntity>
    updateNews(dto: UpdateNewsDto, id:string) : Promise<NewsEntity>

    deleteNews(id: string) : Promise<string>
}