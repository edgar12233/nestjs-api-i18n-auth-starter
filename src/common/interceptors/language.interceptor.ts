import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestContext } from '../context/request-context';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const lang = req.headers['accept-language'] || 'pt-BR';

    return new Observable((observer) => {
      RequestContext.run(
        () => {
          next.handle().subscribe({
            next: (value) => observer.next(value),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
          });
        },
        { lang },
      );
    });
  }
}
