
export const abiERC20 = [
  "function totalSupply() external view returns (uint256)",
  "function balanceOf(address account) external view returns (uint256)",
  "function allowance(address owner, address spender) external view returns (uint256)",

  "function transfer(address recipient, uint256 amount) external returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",

  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)"
]

export const abiERC721 = [
  "function balanceOf(address _owner) external view returns (uint256)",
  "function ownerOf(uint256 _tokenId) external view returns (address)",
  "function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable",
  "function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable",
  "function transferFrom(address _from, address _to, uint256 _tokenId) external payable",
  
  "function approve(address _approved, uint256 _tokenId) external payable",
  "function setApprovalForAll(address _operator, bool _approved) external",
  
  "function getApproved(uint256 _tokenId) external view returns (address)",
  "function isApprovedForAll(address _owner, address _operator) external view returns (bool)",

  "event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId)",
  "event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId)",
  "event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)"
]

export const abiERC1155 = [
  "function safeTransferFrom(address _from, address _to, uint256 _id, uint256 _value, bytes calldata _data) external",
  "function safeBatchTransferFrom(address _from, address _to, uint256[] calldata _ids, uint256[] calldata _values, bytes calldata _data) external",
  
  "function balanceOf(address _owner, uint256 _id) external view returns (uint256)",
  "function balanceOfBatch(address[] calldata _owners, uint256[] calldata _ids) external view returns (uint256[] memory)",
  
  "function setApprovalForAll(address _operator, bool _approved) external",
  "function isApprovedForAll(address _owner, address _operator) external view returns (bool)",

  "event TransferSingle(address indexed _operator, address indexed _from, address indexed _to, uint256 _id, uint256 _value)",
  "event TransferBatch(address indexed _operator, address indexed _from, address indexed _to, uint256[] _ids, uint256[] _values)",
  "event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved)",
  "event URI(string _value, uint256 indexed _id)"
]