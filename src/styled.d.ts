// styled.d.ts >> declaration(선언)파일(d.ts)
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    // 테마가 보일 부분 설정
   textColor?: string;
   accentColor?: string;
   cardBgColor?: string;
   
   bgColor: string;
   cardColor: string;
   boardColor: string;
  }
}