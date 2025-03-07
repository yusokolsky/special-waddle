import {
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';

/**
 * Props interface for components wrapped with withRouter
 */
export interface WithRouterProps {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}

/**
 * HOC that provides router props to class components
 * @param Component - Component to wrap
 * @returns Wrapped component with router props
 */
export function withRouter<P extends WithRouterProps>(
  Component: React.ComponentType<P>
) {
  return function ComponentWithRouterProp(props: Omit<P, keyof WithRouterProps>) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();

    return (
      <Component
        {...(props as P)}
        location={location}
        navigate={navigate}
        params={params}
      />
    );
  };
} 