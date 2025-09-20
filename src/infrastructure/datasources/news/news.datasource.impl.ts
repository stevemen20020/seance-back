import { prisma } from '../../../data/database';
import { AppCustomError } from '../../../domain/errors/AppCustom.error';
import { ErrorMessage } from '../../../domain/errors/Messages.error';
import { NewsEntity } from '../../../domain/entities';
import { NewsDatasource } from '../../../domain/datasources/news/news.datasource';
import { CreateNewsDto } from '../../../domain/dto/news/createNews.dto';
import { SearchNewsQueryParamsDto } from '../../../domain/dto/news/searchNews.dto';
import { UpdateNewsDto } from '../../../domain/dto/news/updateNews.dto';
import NewsMapper from '../../../domain/mappres/news/news.mapper';
import path from 'path';
import fs from 'fs'

export class NewsDatasourceImplementation implements NewsDatasource{
    async getNewsById(id: string): Promise<NewsEntity> {
        const numericId = Number(id);

        if (Number.isNaN(numericId)) {
            throw AppCustomError.badRequest(ErrorMessage['numberIdNotProvided'])
        }

        const existingNews = await prisma.news.findUnique({where:{id:Number(id)}})

        if(!existingNews) throw AppCustomError.badRequest(ErrorMessage['notFound'])
        
        const newsEntity = NewsMapper.prismaToEntity(existingNews)

        return newsEntity
    }
    async getNews(params: SearchNewsQueryParamsDto): Promise<[NewsEntity[], number]> {
        const { title, subTitle, content, page = 1, limit = 10 } = params;

        const totalFound = prisma.news.count({
            where: {
                ...(title && { title }),
                ...(subTitle && { subTitle }),
                ...(content && { content }),
            }
        });

        const newsFound = prisma.news.findMany({
             where: {
                ...(title && { title }),
                ...(subTitle && { subTitle }),
                ...(content && { content }),
            },
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
        })

        const [total, news] = await Promise.all([totalFound, newsFound])

        const newsEntities = news.map((element) => NewsMapper.prismaToEntity(element))
        return [newsEntities, total]

    }
    async updateNews(dto: UpdateNewsDto, id: string): Promise<NewsEntity> {
        const existingNew = await prisma.news.findFirst({ where: { id: Number(id) } });

        if (!existingNew) throw AppCustomError.badRequest(ErrorMessage['notFound']);

        const data: any = {};
        if (dto.title !== undefined) data.title = dto.title;
        if (dto.subtitle !== undefined) data.subTitle = dto.subtitle;
        if (dto.content !== undefined) data.content = dto.content;

        if(dto.image !== undefined) {
            data.image = dto.image;

            if(existingNew.image) {
                const imagePath = path.join(
                    __dirname,
                    "../../../../public/images/uploads/news/", // ajusta según tu estructura
                    existingNew.image
                );

                try {
                    if (fs.existsSync(imagePath)) {
                        await fs.promises.unlink(imagePath);
                        console.log("Imagen eliminada:", imagePath);
                    }
                } catch (err) {
                    console.error("Error al eliminar imagen:", err);
                }
            }
        }

        const updatedNew = await prisma.news.update({
            where: { id: Number(id) },
            data,
        });

        return NewsMapper.prismaToEntity(updatedNew)
    }

    async deleteNews(id: string): Promise<string> {
        const existingNew = await prisma.news.findFirst({ where: { id: Number(id) } });

        if (!existingNew) throw AppCustomError.badRequest(ErrorMessage['notFound']);

        if (existingNew.image) {
            const imagePath = path.join(
                __dirname,
                "../../../../public/images/uploads/news/", // ajusta según tu estructura
                existingNew.image
            );

            try {
                if (fs.existsSync(imagePath)) {
                    await fs.promises.unlink(imagePath);
                    console.log("Imagen eliminada:", imagePath);
                }
            } catch (err) {
                console.error("Error al eliminar imagen:", err);
            }
        }

        await prisma.news.delete({where:{id:Number(id)}})

        return 'New deleted successfully'
    }
    async createNews(dto: CreateNewsDto): Promise<NewsEntity> {
        const data: any = {};
        if (dto.title !== undefined) data.title = dto.title;
        if (dto.subtitle !== undefined) data.subTitle = dto.subtitle;
        if (dto.content !== undefined) data.content = dto.content;
        if (dto.image !== undefined) data.image = dto.image;

        const createdNew = await prisma.news.create({
            data,
        });

        return NewsMapper.prismaToEntity(createdNew)
    }
}