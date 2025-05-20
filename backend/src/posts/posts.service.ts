import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user', 'comments'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  findByUserId(userId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'comments'],
    });
  }

  async findFriendsPosts(userId: number, page: number, limit: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['friends'],
    });
    const friendIds = user.friends.map((f) => f.id);

    return this.postsRepository.find({
      where: { user: { id: In(friendIds) } },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['user', 'comments', 'comments.user', 'likedBy'],
    });
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { userEmail, ...postData } = createPostDto;

    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException(`User with email ${userEmail} not found`);
    }

    const post = this.postsRepository.create({
      ...postData,
      user,
    });

    return this.postsRepository.save(post);
  }
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);
    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async toggleLike(postId: number, userId: number) {
    const post = await this.postsRepository.findOne({
      where: { id: postId },
      relations: ['likedBy'],
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!post) throw new NotFoundException('Post not found');

    if (!user) throw new NotFoundException('User not found');

    const alreadyLiked = post.likedBy.some((user) => user.id === userId);

    if (alreadyLiked) {
      post.likedBy = post.likedBy.filter((user) => user.id !== userId);
      post.likes--;
    } else {
      post.likedBy.push(user);
      post.likes++;
    }

    await this.postsRepository.save(post);
    return post;
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);
    await this.postsRepository.remove(post);
  }
}
