import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const RefreshToken = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const refreshToken: string | undefined = request.cookies?.authCookie?.refreshToken;

    if (!refreshToken) {
        throw new UnauthorizedException();
    }

    return refreshToken;
});
