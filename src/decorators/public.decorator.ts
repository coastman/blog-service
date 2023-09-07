import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const NO_AUTHENTICATION = 'noAuthentication';
export const NoAuthentication = () => SetMetadata(NO_AUTHENTICATION, true);
