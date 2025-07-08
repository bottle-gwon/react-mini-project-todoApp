# 도전과제 요구사항
1. 기존 **CRUD**를 **`useReducer` 와 `dispatch`** 를 활용하여 구현하세요.
2. 투두 리스트를 **`Check`**(완료 처리) 할 수 있도록 구현하세요. 완료 처리된 리스트는 다른 스타일로 보여야 합니다.
3. 투두 리스트를 **`LocalStorage`**를 활용하여 저장 및 불러오기가 되도록 구현하세요. 웹 사이트를 **새로고침** 하여도 리스트가 보여야 합니다.
4. 미완료 / 완료 여부를 **필터링** 가능하고, 투두리스트 **검색**이 가능해야 합니다.
    1. 이 두가지의 필터링은 **중첩**해서 사용할 수 있습니다.
5. 투두 리스트를 **수정** 할 수 있도록 구현하세요. `input`이나 `prompt`가 아닌, **모달**을 생성하여 수정을 구현해보세요.
6. **(선택)드래그 & 드롭**을 구현하여 투두 리스트의 순서를 변경할 수 있어야 합니다.  라이브러리 없이 구현해보세요!

# 현재 진행 사항
1~3번까지만 진행 
4번 진행중

# 기타 전달 사항
도전 과제는 앞에 커밋 메시지 앞부분에 [advance]를 붙였습니다. 

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
