import { Controller, Delete, Get, HttpCode, Param, Patch, Post, Body } from '@nestjs/common';
import { CommentService } from './comments.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  /**
   * Will generate a comment for a idea
   */
  @Post('/users/:userId/projects/:projectId/ideas/:ideaId/comments')
  @HttpCode(201)
  createComment(@Param() routeParameterDTO: any, @Body() commentWriteDTO: any): any {
    try {
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      const comment = commentWriteDTO.comment;
      return this.commentService.createComment(userId,projectId,ideaId,comment);
    }
    catch(e){
      console.log(e)
    }
  }
  /*
  * Will delete a comment
  */
  @Delete('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(200)
  deleteComment(@Param() routeParameterDTO: any): any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      return this.commentService.deleteComment(userId,projectId,ideaId);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will update a comment
  */
  @Patch('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(201)
  updateComment(@Param() routeParameterDTO: any, @Body() commentWriteDTO: any): any{
    try{
      const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      const commentId = routeParameterDTO.commentId;
      const comment = commentWriteDTO.comment;
      return this.commentService.updateComment(userId, projectId, ideaId, commentId, comment);
    }
    catch(e){
      console.log(e);
    }
  }
  /*
  * Will retrieve a single comment
  */
  @Get('/users/:userId/projects/:projectId/ideas/:ideaId/comments/:commentId')
  @HttpCode(200)
  getComment(@Param() routeParameterDTO:any):any{
    const userId = routeParameterDTO.userId;
      const projectId = routeParameterDTO.projectId;
      const ideaId = routeParameterDTO.ideaId;
      const comment = routeParameterDTO.commentId;
      return this.commentService.getComment(userId,projectId,ideaId,comment);
  }
}