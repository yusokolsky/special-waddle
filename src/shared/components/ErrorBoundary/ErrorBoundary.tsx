import { Component, ErrorInfo, ReactNode } from 'react';
import { Button, Result } from 'antd';
import { withRouter, WithRouterProps } from './withRouter';

interface Props extends WithRouterProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors anywhere in their child component tree
 * @extends {Component<Props, State>}
 */
class ErrorBoundaryComponent extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  /**
   * Update state so the next render will show the fallback UI
   */
  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error information
   */
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  /**
   * Handle error retry
   */
  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    this.props.navigate('/');
  };

  /**
   * Handle navigation to home
   */
  private handleBackHome = () => {
    this.props.navigate('/');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <Result
          status="error"
          title="Something went wrong"
          subTitle={this.state.error?.message || 'An unexpected error occurred'}
          extra={[
            <Button key="retry" type="primary" onClick={this.handleRetry}>
              Try Again
            </Button>,
            <Button key="home" onClick={this.handleBackHome}>
              Back Home
            </Button>,
          ]}
        />
      );
    }

    return this.props.children;
  }
}

/**
 * HOC to add router functionality to ErrorBoundary
 */
export const ErrorBoundary = withRouter(ErrorBoundaryComponent); 