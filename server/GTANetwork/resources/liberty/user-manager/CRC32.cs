using System;
using System.Security.Cryptography;

namespace Liberty.userManager {

    public abstract class CRC32 : HashAlgorithm
    {
        /// <summary>
        /// Initializes a new instance of <see cref="CRC32"/> class.
        /// </summary>
        public CRC32() : base()
        {
            this.HashSizeValue = 32;
        }

        /// <summary>
        /// Gets the value of the computed CRC-32 hash code as unsigned 32-bit integer.
        /// </summary>
        /// <value>The current value of the computed CRC-32 hash code.</value>
        public UInt32 CRC32Hash { get; protected set; }

        /// <summary>
        /// Creates an instance of the default implementation of <see cref="CRC32"/> using the managed library and standard polynomial (0x04C11DB7/0xEDB88320/0x82608EDB, used in Ethernet, Serial ATA, MPEG-2, PKZIP, Gzip, Bzip2, PNG, etc.).
        /// </summary>
        /// <returns>A new instance of <see cref="CRC32"/>.</returns>
        new public static CRC32 Create()
        {
            return new CRC32Managed();
        }

        /// <summary>
        /// Creates an instance of the default implementation of <see cref="CRC32"/> using the managed library and custom polynomial..
        /// </summary>
        /// <param name="polynomial">The polynomial to be used (reversed representation).</param>
        /// <returns>A new instance of <see cref="CRC32"/>.</returns>
        public static CRC32 Create(UInt32 polynomial)
        {
            return new CRC32Managed(polynomial);
        }

        /// <summary>
        ///     <para>Creates an instance of the specified implementation of the <see cref="CRC32"/>.</para>
        ///     <para>Calling this method always throws <see cref="NotImplementedException"/>.</para>
        /// </summary>
        /// <param name="hashName">The implementation of <see cref="CRC32"/> to create.</param>
        /// <returns>A new instance of CRC32 using the specified implementation.</returns>
        /// <exception cref="NotImplementedException">Always thrown.</exception>
        new public static CRC32 Create(String hashName)
        {
            throw new NotImplementedException();
        }
    }
    
    public class CRC32Managed : CRC32
    {
        private UInt32[] crc32Table = new UInt32[256];
        private UInt32 crc32Result;

        /// <summary>
        /// Initializes a new instance of <see cref="CRC32Managed"/> class using the managed library and standard polynomial (0x04C11DB7/0xEDB88320/0x82608EDB, used in Ethernet, Serial ATA, MPEG-2, PKZIP, Gzip, Bzip2, PNG, etc.).
        /// </summary>
        public CRC32Managed() : this(0xEDB88320)
        {
        }

        /// <summary>
        /// Initializes a new instance of <see cref="CRC32Managed"/> class using the managed library and custom polynomial.
        /// </summary>
        /// <param name="polynomial">The polynomial to be used (reversed representation).</param>
        public CRC32Managed(UInt32 polynomial) : base()
        {
            for (UInt32 i = 0; i < 256; i++)
            {
                UInt32 crc32 = i;
                for (int j = 8; j > 0; j--)
                {
                    if ((crc32 & 1) == 1)
                    {
                        crc32 = (crc32 >> 1) ^ polynomial;
                    }
                    else
                    {
                        crc32 >>= 1;
                    }
                }
                crc32Table[i] = crc32;
            }

            Initialize();
        }

        /// <summary>
        /// Gets a value indicating whether the current transform can be reused.
        /// </summary>
        /// <value>Always <c>true</c>.</value>
        public override bool CanReuseTransform { get { return true; } }

        /// <summary>
        /// Gets a value indicating whether multiple blocks can be transformed.
        /// </summary>
        /// <value>Always <c>true</c>.</value>
        public override bool CanTransformMultipleBlocks { get { return true; } }

        /// <summary>
        /// Initializes an instance of <see cref="CRC32Managed"/>.
        /// </summary>
        public override void Initialize()
        {
            this.crc32Result = 0xFFFFFFFF;
        }

        /// <summary>
        /// Routes data written to the object into the <see cref="CRC32"/> hash algorithm for computing the hash.
        /// </summary>
        /// <param name="array">The input to compute the hash code for.</param>
        /// <param name="offset">The offset into the byte array from which to begin using data.</param>
        /// <param name="count">The number of bytes in the byte array to use as data.</param>
        /// <remarks>
        ///     <para>This method is not called by application code.</para>
        ///     <para>This method performs the hash computation. Every write to the cryptographic stream object passes the data through this method. For each block of data, this method updates the state of the hash object so a correct hash value is returned at the end of the data stream.</para>
        /// </remarks>
        protected override void HashCore(Byte[] array, int start, int size)
        {
            int end = start + size;
            for (int i = start; i < end; i++)
            {
                this.crc32Result = (this.crc32Result >> 8) ^ this.crc32Table[array[i] ^ (this.crc32Result & 0x000000FF)];
            }
        }

        /// <summary>
        /// Finalizes the hash computation after the last data is processed by the cryptographic stream object.
        /// </summary>
        /// <returns>The computed hash code.</returns>
        /// <remarks>
        ///     <para>This method is not called by application code.</para>
        ///     <para>This method finalizes any partial computation and returns the correct hash value of the data stream.</para>
        /// </remarks>
        protected override Byte[] HashFinal()
        {
            this.crc32Result = ~this.crc32Result;

            this.CRC32Hash = this.crc32Result;

            this.HashValue = BitConverter.GetBytes(this.crc32Result);

            return this.HashValue;
        }
    }

}