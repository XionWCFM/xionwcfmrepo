export type VitestTestResultsType = {
  repoPath: string;
  numTotalTestSuites: number;
  numPassedTestSuites: number;
  numFailedTestSuites: number;
  numPendingTestSuites: number;
  numTotalTests: number;
  numPassedTests: number;
  numFailedTests: number;
  numPendingTests: number;
  numTodoTests: number;
  snapshot: {
    added: number;
    failure: boolean;
    filesAdded: number;
    filesRemoved: number;
    filesUnmatched: number;
    filesUpdated: number;
    matched: number;
    total: number;
    unchecked: number;
    unmatched: number;
    updated: number;
    didUpdate: boolean;
  };
  startTime: number;
  success: boolean;
  testResults: Array<{
    assertionResults: Array<{
      ancestorTitles: string[];
      fullName: string;
      status: string;
      title: string;
      duration: number;
      failureMessages: string[];
    }>;
    startTime: number;
    endTime: number;
    status: string;
    message: string;
    name: string;
  }>;
};

export type VitestCoverageSummeryType = {
  total: {
    lines: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    statements: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    functions: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    branches: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    branchesTrue: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
  };
  [key: string]: {
    lines: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    functions: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    statements: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
    branches: {
      total: number;
      covered: number;
      skipped: number;
      pct: number;
    };
  };
};
